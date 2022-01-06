// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    const data = await fetch(
      "https://catalog.gamepass.com/sigls/v2?id=29a81209-df6f-41fd-a528-2ae6b91f719c&language=en-us&market=PL"
    );
    const jsonData = await data.json();
    res.status(200).json(jsonData);
  } catch (err) {
    res.status(404).send(err);
  }
}
