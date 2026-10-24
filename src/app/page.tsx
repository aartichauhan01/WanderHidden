'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import { AppLogo } from '@/components/AppLogo';
import {
  Compass,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Info
} from 'lucide-react';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  fullName: z.string().optional(),
});

type AuthFormData = z.infer<typeof authSchema>;

export default function AuthWelcomePage() {
  const router = useRouter();
  const { user, signIn, signUp, resetPassword, isDemoMode, switchToDemoMode } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  // If already authenticated, redirect to discover page
  useEffect(() => {
    if (user) {
      router.push('/search-destination-screen');
    }
  }, [user, router]);

  const onSubmit = async (data: AuthFormData) => {
    setServerError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        const result = await signIn(data.email, data.password);
        if (result.error) {
          setServerError(result.error);
        } else {
          router.push('/search-destination-screen');
        }
      } else if (mode === 'signup') {
        const result = await signUp(data.email, data.password, data.fullName);
        if (result.error) {
          setServerError(result.error);
        } else {
          setSuccessMessage('Account created successfully! Redirecting...');
          setTimeout(() => {
            router.push('/search-destination-screen');
          }, 1000);
        }
      } else if (mode === 'reset') {
        const result = await resetPassword(data.email);
        if (result.error) {
          setServerError(result.error);
        } else {
          setSuccessMessage(result.message || 'Check your email for password reset instructions.');
        }
      }
    } catch (err: any) {
      setServerError(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoAccess = () => {
    switchToDemoMode();
    router.push('/search-destination-screen');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-stone-50 selection:bg-amber-200">
      {/* Left Column: Visual cinematic showcase */}
      <div className="relative lg:w-1/2 min-h-[380px] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 text-white bg-forest-950 overflow-hidden">
        {/* Cinematic background image */}
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85"
          alt="Himalayan Valley Mist"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center opacity-40 mix-blend-overlay scale-105 transition-transform duration-1000"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-900/40" />

        {/* Top Logo */}
        <div className="relative z-10">
          <AppLogo size="lg" variant="light" />
        </div>

        {/* Middle Feature Content */}
        <div className="relative z-10 max-w-lg my-auto pt-10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800/80 border border-forest-600/60 text-xs font-semibold text-amber-300 mb-4 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Discover What Mainstream Maps Skip</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            Find the places <br />
            <span className="text-amber-400">others miss.</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-8">
            Step beyond overcrowded tourist circuits. Unveil 20+ verified offbeat valleys, ancient rock-cut sanctums, living root bridges, and high bugyals across 18 Indian states.
          </p>

          {/* Value points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Multi-Day Itinerary Planner</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Interactive Coordinate Maps</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Transparent INR (₹) Budgets</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Verified Local Homestays</span>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="relative z-10 pt-4 border-t border-forest-800/60 text-xs text-stone-400 flex items-center justify-between">
          <span>"The gladdest moment in human life is a departure into unknown lands."</span>
          <span className="text-amber-400 font-semibold">• India Unveiled</span>
        </div>
      </div>

      {/* Right Column: Auth form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 tracking-tight">
              {mode === 'signin' && 'Welcome back, traveler'}
              {mode === 'signup' && 'Begin your journey'}
              {mode === 'reset' && 'Reset your password'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {mode === 'signin' && 'Sign in to access your saved secret gems and itineraries.'}
              {mode === 'signup' && 'Create your WanderHidden account to save favorites and trips.'}
              {mode === 'reset' && 'Enter your email to receive a password reset link.'}
            </p>
          </div>

          {/* Notification Alerts */}
          {serverError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2 animate-in fade-in">
              <Info className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    {...register('fullName')}
                    type="text"
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-700 shadow-2xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="traveler@example.com"
                  className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-700 shadow-2xs"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-xs mt-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            {mode !== 'reset' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setMode('reset')}
                      className="text-xs text-forest-700 hover:text-forest-900 font-semibold cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-700 shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.password.message}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Authenticating...</span>
              ) : (
                <>
                  <span>
                    {mode === 'signin' && 'Sign In to WanderHidden'}
                    {mode === 'signup' && 'Create Free Account'}
                    {mode === 'reset' && 'Send Reset Link'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Modes */}
          <div className="text-center text-xs text-stone-600">
            {mode === 'signin' ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signup');
                    reset();
                    setServerError(null);
                  }}
                  className="font-bold text-forest-800 hover:text-forest-950 underline cursor-pointer"
                >
                  Create one now
                </button>
              </p>
            ) : mode === 'signup' ? (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signin');
                    reset();
                    setServerError(null);
                  }}
                  className="font-bold text-forest-800 hover:text-forest-950 underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p>
                Remember your password?{' '}
                <button
                  onClick={() => {
                    setMode('signin');
                    reset();
                    setServerError(null);
                  }}
                  className="font-bold text-forest-800 hover:text-forest-950 underline cursor-pointer"
                >
                  Back to sign in
                </button>
              </p>
            )}
          </div>

          {/* Explicit Guest / Demo Mode Button */}
          <div className="pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full py-2.5 px-4 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Explore Instantly as Guest / Demo Mode</span>
            </button>
            <p className="text-[11px] text-stone-400 text-center mt-2 leading-tight">
              Instant access without Supabase configuration. Offline storage will save your trips & favorites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
