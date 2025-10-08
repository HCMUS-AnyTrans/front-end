export default function PricingAnimations() {
  return (
    <style jsx global>{`
      @keyframes gradient-shift {
        0%,
        100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }

      @keyframes gradient-x {
        0%,
        100% {
          background-position: 0% center;
        }
        50% {
          background-position: 200% center;
        }
      }

      @keyframes shimmer {
        0% {
          box-shadow:
            0 0 20px rgba(65, 105, 225, 0.3),
            0 0 40px rgba(65, 105, 225, 0.2);
        }
        50% {
          box-shadow:
            0 0 30px rgba(65, 105, 225, 0.5),
            0 0 60px rgba(65, 105, 225, 0.3);
        }
        100% {
          box-shadow:
            0 0 20px rgba(65, 105, 225, 0.3),
            0 0 40px rgba(65, 105, 225, 0.2);
        }
      }

      @keyframes float {
        0%,
        100% {
          transform: translateY(0px) scale(1.05);
        }
        50% {
          transform: translateY(-10px) scale(1.05);
        }
      }

      @keyframes bounce-subtle {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }

      @keyframes pulse-glow {
        0%,
        100% {
          opacity: 0.2;
        }
        50% {
          opacity: 0.4;
        }
      }

      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
  );
}
