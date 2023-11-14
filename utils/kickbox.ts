import kickbox from "kickbox";

const client = kickbox.client(process.env.KICKBOX_LIVE_API_KEY).kickbox();

export const checkEmail = async (email: string) => {
  try {
    const response = await client.verify(email);
    const result = response.body.result === 'deliverable';
    return { data: result, error: null };
  } catch (error) {
    console.error(`Error checking email ${email}: ${error.message}`);
    return { data: null, error };
  }
}

