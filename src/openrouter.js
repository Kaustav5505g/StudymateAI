const openai = {
  chat: {
    completions: {
      create: async ({ model, messages }) => {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model, messages }),
        });

        if (!response.ok) {
          throw new Error("AI request failed");
        }

        return response.json();
      },
    },
  },
};

export default openai;