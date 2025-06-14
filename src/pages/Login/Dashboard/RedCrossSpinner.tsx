const RedCrossSpinner: React.FC = () => {
  return (
    <>
      <div className="objetos">
        <div className="red-cross-spinner" />
        <span className="spinner-text">Procesando información del paciente...</span>
      </div>

      <style>{`
        .objetos {
          display: flex;
          align-items: center;
          gap: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          
        }

        .red-cross-spinner {
          position: relative;
          width: 40px;
          height: 40px;
          animation: pulse 1s ease-in-out infinite;
        }

        .red-cross-spinner::before,
        .red-cross-spinner::after {
          content: "";
          position: absolute;
          background-color: red;
          border-radius: 4px;
        }

        .red-cross-spinner::before {
          top: 50%;
          left: 0;
          width: 100%;
          height: 14px;
          transform: translateY(-50%);
        }

        .red-cross-spinner::after {
          left: 50%;
          top: 0;
          width: 14px;
          height: 100%;
          transform: translateX(-50%);
        }

        .spinner-text {
          
          animation: ambulance-blink 1s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes ambulance-blink {
          0%, 100% {
            color: red;
            opacity: 1;
          }
          50% {
            color: black;
            opacity: 0.3;
          }
        }
      `}</style>
    </>
  );
};

export default RedCrossSpinner;

