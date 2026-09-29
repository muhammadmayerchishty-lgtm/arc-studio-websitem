'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Glass } from '@/components/ui/Glass';
import {
  Sparkles,
  X,
  Send,
  Calendar,
  Clock,
  User,
  Phone,
  Layers,
  MessageSquare,
  Check,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

export const appointmentFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name (at least 2 characters)'),
  phone: z.string().trim().min(7, 'Please provide a valid Phone or WhatsApp contact number'),
  service: z.enum(
    ['Architecture', 'Interior design', 'Renovation', 'Commercial fit-out'],
    {
      errorMap: () => ({ message: 'Please select a service for your project' }),
    }
  ),
  interestedProject: z.string().optional().default(''),
  preferredDate: z.string().min(1, 'Please select your preferred consultation date'),
  timeSlot: z.string().min(1, 'Please select an appointment time slot'),
  message: z.string().optional().default(''),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

const SERVICES = [
  'Architecture',
  'Interior design',
  'Renovation',
  'Commercial fit-out',
] as const;

const TIME_SLOTS = [
  'Morning (10:00 AM – 1:00 PM)',
  'Afternoon (2:00 PM – 5:00 PM)',
  'Evening (5:00 PM – 8:00 PM)',
];

export const AppointmentForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [checkState, setCheckState] = useState<'out' | 'in'>('out');
  const [submittedData, setSubmittedData] = useState<AppointmentFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [prefilledBadge, setPrefilledBadge] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      service: 'Architecture',
      interestedProject: '',
      preferredDate: '',
      timeSlot: 'Morning (10:00 AM – 1:00 PM)',
      message: '',
    },
  });

  // Listen for auto-fill custom events from the Projects section
  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ project: string }>;
      if (customEvent.detail && customEvent.detail.project) {
        const proj = customEvent.detail.project;
        setValue('interestedProject', proj);
        setPrefilledBadge(proj);
      }
    };

    window.addEventListener('arc-prefill-book', handlePrefill);
    return () => window.removeEventListener('arc-prefill-book', handlePrefill);
  }, [setValue]);

  // Card resize transition helper: measures height changes smoothly
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = 'auto';
    }
  }, [isSuccess]);

  const onSubmit = async (data: AppointmentFormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      // POST to /api/appointments route handler
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.message || 'Server error. Please try again.');
      }

      setSubmittedData(data);
      setIsSuccess(true);

      // Trigger the .t-success-check animation: "out" then "in"
      setCheckState('out');
      requestAnimationFrame(() => {
        setTimeout(() => {
          setCheckState('in');
        }, 50);
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    setCheckState('out');
    setSubmittedData(null);
    setServerError(null);
    reset();
  };

  // Generate WhatsApp confirmation URL with formatted appointment parameters
  const generateWhatsAppUrl = (data: AppointmentFormValues) => {
    const lines = [
      `*Arc Studio — Consultation Request*`,
      `Client: ${data.fullName}`,
      `Phone/WhatsApp: ${data.phone}`,
      `Service: ${data.service}`,
      data.interestedProject ? `Interested Project: ${data.interestedProject}` : null,
      `Preferred Date: ${data.preferredDate}`,
      `Preferred Slot: ${data.timeSlot}`,
      data.message ? `Notes: ${data.message}` : null,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/923704921265?text=${text}`;
  };

  return (
    <div
      ref={containerRef}
      className="card-resize-container w-full max-w-2xl mx-auto text-left relative"
    >
      {/* Prefill Banner */}
      {prefilledBadge && !isSuccess && (
        <div className="mb-6 flex items-center justify-between p-3.5 px-5 rounded-full bg-brass/15 border border-brass/40 backdrop-blur-md animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-brass animate-pulse" />
            <span className="text-xs font-body text-bone">
              Pre-filled from Portfolio:{' '}
              <strong className="text-brass-light font-medium">{prefilledBadge}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setPrefilledBadge('');
              setValue('interestedProject', '');
            }}
            aria-label="Clear project reference"
            className="p-1 rounded-full hover:bg-white/10 text-smoke hover:text-bone transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* SUCCESS STATE */}
      {isSuccess && submittedData ? (
        <Glass
          variant="panel"
          className="w-full !p-8 sm:!p-12 border-brass/40 bg-basalt-surface/90 text-center flex flex-col items-center shadow-2xl"
        >
          {/* Animated Success Check: .t-success-check */}
          <div
            className="t-success-check flex items-center justify-center mb-6 will-change-transform"
            data-state={checkState}
          >
            <div className="w-20 h-20 rounded-full bg-brass/15 border-2 border-brass flex items-center justify-center text-brass shadow-[0_0_30px_rgba(201,163,107,0.3)]">
              <svg
                className="w-10 h-10 text-brass stroke-current"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  className="t-success-check-path"
                  d="M20 6L9 17L4 12"
                />
              </svg>
            </div>
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-brass">
            Commission Request Logged
          </span>

          <h3 className="mt-3 font-display text-3xl sm:text-4xl text-bone font-light">
            Consultation Initiated
          </h3>

          <p className="mt-3 font-body text-xs sm:text-sm text-smoke-light font-light max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-bone">{submittedData.fullName}</strong>. Your request for{' '}
            <strong className="text-brass-light">{submittedData.service}</strong> on{' '}
            <strong className="text-bone">{submittedData.preferredDate}</strong> ({submittedData.timeSlot}) has been registered with our Lahore atelier desk.
          </p>

          {/* Action Buttons: Confirm on WhatsApp + Reset */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={generateWhatsAppUrl(submittedData)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs font-body tracking-[0.15em] uppercase font-semibold text-basalt shadow-lg hover:shadow-brass-glow transition-all duration-300 cursor-pointer"
              style={{
                background:
                  'linear-gradient(135deg, #dfc295 0%, #c9a36b 60%, #b58c50 100%)',
              }}
            >
              <Phone className="w-4 h-4 text-basalt" />
              <span>Confirm on WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-basalt" />
            </a>

            <button
              type="button"
              onClick={handleResetForm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-body tracking-wider uppercase text-smoke hover:text-bone border border-white/10 hover:border-brass/30 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Book Another</span>
            </button>
          </div>
        </Glass>
      ) : (
        /* APPOINTMENT FORM */
        <Glass
          variant="panel"
          className="w-full !p-6 sm:!p-10 border-brass/30 bg-basalt-surface/80 backdrop-blur-2xl shadow-2xl"
        >
          {serverError && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-body">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* Row 1: Full Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-[11px] font-mono uppercase tracking-widest text-smoke mb-2"
                >
                  Full Name <span className="text-brass">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-smoke">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. Tariq Mansoor"
                    {...register('fullName')}
                    aria-invalid={errors.fullName ? 'true' : 'false'}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border text-bone text-xs font-body placeholder:text-smoke/40 focus:outline-none transition-all ${
                      errors.fullName
                        ? 'border-red-500/60 focus:border-red-500 ring-1 ring-red-500/30'
                        : 'border-white/10 focus:border-brass/70 focus:ring-1 focus:ring-brass/40'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1.5 text-[11px] text-red-400 font-body">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-[11px] font-mono uppercase tracking-widest text-smoke mb-2"
                >
                  Phone / WhatsApp <span className="text-brass">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-smoke">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="0300 1234567"
                    {...register('phone')}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border text-bone text-xs font-body placeholder:text-smoke/40 focus:outline-none transition-all ${
                      errors.phone
                        ? 'border-red-500/60 focus:border-red-500 ring-1 ring-red-500/30'
                        : 'border-white/10 focus:border-brass/70 focus:ring-1 focus:ring-brass/40'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-[11px] text-red-400 font-body">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Service & Interested Project */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="service"
                  className="block text-[11px] font-mono uppercase tracking-widest text-smoke mb-2"
                >
                  Service Required <span className="text-brass">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-smoke">
                    <Layers className="w-4 h-4" />
                  </div>
                  <select
                    id="service"
                    {...register('service')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-basalt-surface border border-white/10 text-bone text-xs font-body focus:outline-none focus:border-brass/70 transition-colors appearance-none cursor-pointer"
                  >
                    {SERVICES.map((s) => (
                      <option key={s} value={s} className="bg-basalt text-bone">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.service && (
                  <p className="mt-1.5 text-[11px] text-red-400 font-body">
                    {errors.service.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="interestedProject"
                  className="block text-[11px] font-mono uppercase tracking-widest text-smoke mb-2"
                >
                  Interested Project Reference
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-smoke">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <input
                    id="interestedProject"
                    type="text"
                    placeholder="e.g. Villa Aurora, Noir Residence"
                    {...register('interestedProject')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-bone text-xs font-body placeholder:text-smoke/40 focus:outline-none focus:border-brass/70 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Preferred Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="preferredDate"
                  className="block text-[11px] font-mono uppercase tracking-widest text-smoke mb-2"
                >
                  Preferred Date <span className="text-brass">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-smoke">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    id="preferredDate"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('preferredDate')}
                    aria-invalid={errors.preferredDate ? 'true' : 'false'}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border text-bone text-xs font-body focus:outline-none transition-all [color-scheme:dark] ${
                      errors.preferredDate
                        ? 'border-red-500/60 focus:border-red-500 ring-1 ring-red-500/30'
                        : 'border-white/10 focus:border-brass/70'
                    }`}
                  />
                </div>
                {errors.preferredDate && (
                  <p className="mt-1.5 text-[11px] text-red-400 font-body">
                    {errors.preferredDate.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="timeSlot"
                  className="block text-[11px] font-mono uppercase tracking-widest text-smoke mb-2"
                >
                  Preferred Slot <span className="text-brass">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-smoke">
                    <Clock className="w-4 h-4" />
                  </div>
                  <select
                    id="timeSlot"
                    {...register('timeSlot')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-basalt-surface border border-white/10 text-bone text-xs font-body focus:outline-none focus:border-brass/70 transition-colors appearance-none cursor-pointer"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-basalt text-bone">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.timeSlot && (
                  <p className="mt-1.5 text-[11px] text-red-400 font-body">
                    {errors.timeSlot.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 4: Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-[11px] font-mono uppercase tracking-widest text-smoke mb-2"
              >
                Project Vision or Plot Details (Optional)
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3.5 pointer-events-none text-smoke">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Share details regarding plot size, location (e.g. DHA Phase 6), architectural intent, or timeline..."
                  {...register('message')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-bone text-xs font-body placeholder:text-smoke/40 focus:outline-none focus:border-brass/70 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs font-body tracking-[0.15em] uppercase font-semibold text-basalt shadow-lg hover:shadow-brass-glow transition-all duration-300 disabled:opacity-60 cursor-pointer"
                style={{
                  background:
                    'linear-gradient(135deg, #dfc295 0%, #c9a36b 60%, #b58c50 100%)',
                }}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-basalt animate-spin" />
                    <span>Transmitting Commission Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-basalt" />
                    <span>Submit Consultation Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </Glass>
      )}
    </div>
  );
};

export default AppointmentForm;
