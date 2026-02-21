// src/helpers/eventPayments.ts

export type EventOption = {
  amount: number;
  qr: string;
};

export type EventPaymentType = {
  options: Record<string, EventOption>;
};

export const EVENT_PAYMENTS: Record<string, EventPaymentType> = {
  autocad: {
    options: {
      single: {
        amount: 100,
        qr: "/payments/clashofcad-single.jpeg",
      },
      team: {
        amount: 200,
        qr: "/payments/clashofcad-team.jpeg",
      },
    },
  },

  brainbattle: {
    options: {
      team3: {
        amount: 150,
        qr: "/payments/brainbattle-team3.jpeg",
      },
      team4: {
        amount: 200,
        qr: "/payments/brainbattle-team4.jpeg",
      },
    },
  },
  stickstopia: {
    options: {
      single: {
        amount: 80,
        qr: "/payments/stickstopia-single.jpeg",
      },
      team: {
        amount: 150,
        qr: "/payments/stickstopia-team.jpeg",
      },
    },
  },
  instrumentiq: {
    options: {
      single: {
        amount: 80,
        qr: "/payments/instrumentiq-single.jpeg",
      },
  },
},
  primaverap6: {
    options: {
      single: {
        amount: 500,
        qr: "/payments/primavera.jpeg",
      },
  },
},

  presentationhub: {
    options: {
      single: {
        amount: 100,
        qr: "/payments/presentationhub.jpeg",
      },
  },
},

   geometry: {
    options: {
      single: {
        amount: 100,
        qr: "/payments/geometry-single.jpeg",
      },
      team: {
        amount: 150,
        qr: "/payments/geometry-team.jpeg",
      },
    },
  },
   bgmiff: {
    options: {
      bgmi: {
        amount: 200,
        qr: "/payments/bgmiff-bgmi.jpeg",
      },
      freefire: {
        amount: 200,
        qr: "/payments/bgmiff-freefire.jpeg",
      },
    },
  },
   photoreelcontest: {
    options: {
      photo: {
        amount: 30,
        qr: "/payments/phtoreelcontest-photo.jpeg",
      },
      reel: {
        amount: 30,
        qr: "/payments/phtoreelcontest-reel.jpeg",
      },
      combo:{
        amount:50,
        qr:"/payments/phtoreelcontest-combo.jpeg"
      }
    },
  },

  treasurehunt: {
    options: {
      single: {
        amount:50,
        qr: "/payments/treasurehunt-single.jpeg",
      },
      team: {
        amount: 200,
        qr: "/payments/tresurehunt-team.jpeg",
      },
    },
  },
   rubicscube: {
    options: {
      single: {
        amount: 40,
        qr: "/payments/rubicscube.jpeg",
      },
  },
},
   imagequiz: {
    options: {
      single: {
        amount: 30,
        qr: "/payments/imagequiz.jpeg",
      },
  },
},
   matchthehands: {
    options: {
      single: {
        amount: 30,
        qr: "/payments/matchthehands.jpeg",
      },
  },
},


 
};