export const EVENT_PRICES: Record<
  string,
  { price: number; qr: string }
> = {
  // 🔹 Workshops
  "primavera-p6": {
    price: 199,
    qr: "/payments/primavera-p6.jpeg",
  },

  "ai-machine-learning-bootcamp": {
    price: 199,
    qr: "/payments/ai-machine-learning-bootcamp.jpeg",
  },

  "web-development-with-next-js": {
    price: 199,
    qr: "/payments/web-development-with-next-js.jpeg",
  },

  "data-science-with-python": {
    price: 199,
    qr: "/payments/data-science-with-python.jpeg",
  },

  // 🔹 Technical Events
  "code-clash": {
    price: 50,
    qr: "/payments/code-clash.jpeg",
  },

  "hackathon": {
    price: 100,
    qr: "/payments/hackathon.jpeg",
  },

  // 🔹 Non-Technical Events
  "treasure-hunt": {
    price: 30,
    qr: "/payments/treasure-hunt.jpeg",
  },

  "fun-quiz": {
    price: 20,
    qr: "/payments/fun-quiz.jpeg",
  },
};
