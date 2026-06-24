import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [
    {
      id: "MY",
      name: "Mehmet Yılmaz",
      role: "Muhasebe",
      active: true,
      initials: "MY",
      bgClass: "avatar-indigo",
    },
    {
      id: "AY",
      name: "Ahmet Yılmaz",
      role: "Teknik Destek",
      active: true,
      initials: "AY",
      bgClass: "avatar-slate",
    },
    {
      id: "AK",
      name: "Ayşe Kaya",
      role: "Admin",
      active: true,
      initials: "AK",
      bgClass: "avatar-orange",
    },
    {
      id: "FY",
      name: "Fatma Yılmaz",
      role: "Satış",
      active: false,
      initials: "FY",
      bgClass: "avatar-blue",
    },
  ],
  activeContactId: "MY",
  threads: {
    AY: [
      {
        id: 1,
        sender: "AY",
        content:
          "Selam Selahaddin Bey bugün toplantımız Saat 15.00 da olacaktır. Hatırlatmak istedim.",
        time: "10.30",
      },
      {
        id: 2,
        sender: "FY",
        content:
          "Selam Selahaddin Bey bugün toplantımız Saat 15.00 da olacaktır. Hatırlatmak istedim.",
        time: "10.42",
      },
      {
        id: 3,
        sender: "AY",
        content:
          "Selam Selahaddin Bey bugün toplantımız Saat 15.00 da olacaktır. Hatırlatmak istedim.",
        time: "14.50",
      },
      {
        id: 4,
        sender: "FY",
        content:
          "Selam Selahaddin Bey bugün toplantımız Saat 15.00 da olacaktır. Hatırlatmak istedim.",
        time: "15.30",
      },
    ],
    MY: [
      {
        id: 1,
        sender: "MY",
        content:
          "Selam Selahaddin Bey bugün toplantımız Saat 15.00 da olacaktır. Hatırlatmak istedim.",
        time: "10.30",
      },
    ],
    FY: [
      {
        id: 1,
        sender: "FY",
        content:
          "Selam Selahaddin Bey bugün toplantımız Saat 15.00 da olacaktır. Hatırlatmak istedim.",
        time: "10.30",
      },
    ],
    AK: [
      {
        id: 1,
        sender: "AK",
        content:
          "Selam Selahaddin Bey bugün toplantımız Saat 15.00 da olacaktır. Hatırlatmak istedim.",
        time: "10.30",
      },
    ],
  },
};

const messageSlice = createSlice({
  name: "messaging",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const activeId = state.activeContactId;
      if (!state.threads[activeId]) {
        state.threads[activeId] = [];
      }
      const timeStr = new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const nextId =
        state.threads[activeId].length > 0
          ? Math.max(...state.threads[activeId].map((m) => m.id)) + 1
          : 1;
      state.threads[activeId].push({
        id: nextId,
        sender: "FY",
        content: action.payload,
        time: timeStr,
      });
    },
    setActiveContact: (state, action) => {
      state.activeContactId = action.payload;
    },
  },
});
export const { sendMessage, setActiveContact } = messageSlice.actions;
export default messageSlice.reducer;
