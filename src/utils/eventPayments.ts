export type EventOption = {
  amount: number;
  qr: string;
};



export type EventPaymentType = {
  options: Record<string, EventOption>;
};

export const EVENT_PAYMENTS: Record<string, EventPaymentType> = {
  clashofcad: {
    options: {
      single: {
        amount: 100,
        qr: "/payments/autocad-single.jpeg",
      },
      team: {
        amount: 200,
        qr: "/payments/autocad-team.jpeg",
      },
    },
  },

  brainbuzz: {
    options: {
      team3: {
        amount: 150,
        qr: "/payments/brainbuzz(3).jpeg",
      },
      team4: {
        amount: 200,
        qr: "/payments/brainbuzz(4).jpeg",
      },
    },
  },
  stickstopia: {
    options: {
      single: {
        amount: 80,
        qr: "/payments/stickstopia-single.jpeg",
      },
      team4: {
        amount: 150,
        qr: "/payments/brainbuzz(4).jpeg",
      },
    },
  },
  instrumentiq: {
    options: {
      single: {
        amount: 50,
        qr: "/payments/instrumentiq.jpeg",
      },
    },
  },
  presentationhub: {
    options: {
      single: {
        amount: 100,
        qr: "/payments/ppt.jpeg",
      },
    },
  },
  geometry: {
    options: {
      single: {
        amount: 80,
        qr: "/payments/geometry-single.jpeg",
      },
      team4: {
        amount: 150,
        qr: "/payments/geometry-team.jpeg",
      },
    },
  },
  
};
