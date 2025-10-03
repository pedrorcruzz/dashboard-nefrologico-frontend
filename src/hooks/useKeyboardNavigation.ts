import { useEffect, useRef } from "react";

export const useKeyboardNavigation = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current) return;

      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.key === "Tab") {
        if (event.shiftKey) {
          // Shift + Tab - navegar para trás
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab - navegar para frente
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }

      // Escape para fechar modais ou voltar ao foco anterior
      if (event.key === "Escape") {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return containerRef;
};

export const useFocusManagement = () => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const saveFocus = () => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  };

  const restoreFocus = () => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  };

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  };

  return { saveFocus, restoreFocus, trapFocus };
};

