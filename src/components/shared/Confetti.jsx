import confetti from "canvas-confetti";

export const launchConfetti = () => {
  confetti({
    particleCount: 120,
    spread:        80,
    origin:        { y: 0.6 },
    colors:        ["#d6c06f", "#f6e6a1", "#bfa24a", "#135a3a", "#ffffff"],
    scalar:        1.1,
  });
};
