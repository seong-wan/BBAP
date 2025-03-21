import { useEffect, useState } from "react";
import logoimg from "/assets/images/logo.png";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("사용자가 설치를 눌렀습니다.");
        } else {
          console.log("사용자가 설치를 취소했습니다.");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="mx-auto my-4 w-40 h-40 shadow-lg bg-indigo-50 rounded-full">
      <button onClick={handleInstallClick}>
        {" "}
        <img src={logoimg} alt="Login Logo" />
      </button>
    </div>
  );
};

export default PWAInstallPrompt;
