const API_KEY = process.env.KICKBOX_LIVE_API_KEY;

export const verifyEmail = async (email: string) => {
  try {
    const response = await fetch(`https://api.kickbox.com/v2/verify?email=${email}&apikey=${API_KEY}`);
    const data = await response.json();
    return { data: data.result === "deliverable", error: null };
  } catch (error) {
    return { data: false, error };
  }
};
