"use client";

import Image from "next/image";

type ProductModalProps = {
  open: boolean;

  onClose: () => void;

  product: any;
};

export default function ProductModal({
  open,
  onClose,
  product,
}: ProductModalProps) {
  if (!open || !product) return null;

  return (
    <div
      className="product-modal-overlay"
      onClick={onClose}
    >
      {/* MODAL */}

      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HERO */}

        <div className="product-modal-hero">
          <Image
            fill
            src={product.image}
            alt={product.title}
            className="object-cover"
          />

          <div className="product-modal-overlay-bg" />

          {/* CONTENT */}

          <div className="product-modal-hero-content">
            <h2 className="product-modal-title">
              {product.title}
            </h2>

            <p className="product-modal-subtitle">
              {product.subtitle}
            </p>
          </div>

          {/* CLOSE */}

          <button
            className="product-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* BODY */}

        <div className="product-modal-body">
          {/* IMPACT */}

          <div className="product-modal-label">
            Real-World Environmental Impact
          </div>

          <div className="product-impact-grid">
            {product.impact.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="product-impact-card"
                >
                  <div className="impact-value">
                    {item.value}
                  </div>

                  <div className="impact-key">
                    {item.key}
                  </div>
                </div>
              )
            )}
          </div>

          {/* PROCESS */}

          <div className="product-modal-label mt-14">
            Manufacturing Process
          </div>

          <div className="product-steps">
            {product.steps.map(
              (step: any, index: number) => (
                <div
                  key={index}
                  className="process-step"
                >
                  <div className="process-number">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="process-title">
                      {step.title}
                    </h3>

                    <p className="process-description">
                      {step.description}
                    </p>

                    <div className="process-highlight">
                      {step.highlight}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
