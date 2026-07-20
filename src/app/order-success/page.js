'use client';

import Link from 'next/link';
import '../../components/component.css';

export default function OrderSuccess() {
  return (
    <div className="success-page">
      {/* ── HEADER ── */}
      <div className="success-header">
        <div className="success-header-inner">
          <div className="success-check">✓</div>
          <div>
            <h1 className="success-title">Order placed!</h1>
            <p className="success-sub">
              Thank you for shopping with Simple Supplies.
            </p>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="success-body">
        {/* MAIN MESSAGE */}
        <div className="success-card success-card--main">
          <div className="success-icon">📦</div>
          <h2 className="success-card-title">We&apos;ve received your order</h2>
          <p className="success-card-text">
            Your order has been confirmed and is being prepared. We&apos;ll send
            you an update as soon as it&apos;s on its way.
          </p>
        </div>

        {/* STEPS */}
        <div className="success-steps">
          <div className="success-step success-step--done">
            <div className="success-step-icon">✓</div>
            <div className="success-step-info">
              <div className="success-step-label">Order confirmed</div>
              <div className="success-step-sub">
                We&apos;ve received your order
              </div>
            </div>
          </div>

          <div className="success-step-line" />

          <div className="success-step success-step--active">
            <div className="success-step-icon">🏭</div>
            <div className="success-step-info">
              <div className="success-step-label">Being prepared</div>
              <div className="success-step-sub">
                Your items are being packed
              </div>
            </div>
          </div>

          <div className="success-step-line success-step-line--muted" />

          <div className="success-step success-step--pending">
            <div className="success-step-icon">🚚</div>
            <div className="success-step-info">
              <div className="success-step-label">Out for delivery</div>
              <div className="success-step-sub">On its way to you</div>
            </div>
          </div>

          <div className="success-step-line success-step-line--muted" />

          <div className="success-step success-step--pending">
            <div className="success-step-icon">🏠</div>
            <div className="success-step-info">
              <div className="success-step-label">Delivered</div>
              <div className="success-step-sub">Enjoy your order!</div>
            </div>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="success-info-grid">
          <div className="success-info-card">
            <div className="success-info-icon">📧</div>
            <div className="success-info-title">Confirmation email</div>
            <div className="success-info-text">
              A confirmation has been sent to your email with your order
              details.
            </div>
          </div>
          <div className="success-info-card">
            <div className="success-info-icon">🔔</div>
            <div className="success-info-title">Order updates</div>
            <div className="success-info-text">
              We&apos;ll let you know when your order is ready and out for
              delivery.
            </div>
          </div>
          <div className="success-info-card">
            <div className="success-info-icon">↩️</div>
            <div className="success-info-title">Free returns</div>
            <div className="success-info-text">
              Not happy? Return any item within 30 days, no questions asked.
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="success-actions">
          <Link href="/" className="success-btn success-btn--primary">
            Continue shopping
          </Link>
          <Link href="/" className="success-btn success-btn--secondary">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
