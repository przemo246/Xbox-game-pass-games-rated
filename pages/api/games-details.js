export default async function handler(req, res) {
  try {
    const data = await fetch(
      `https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=${req.query.ids}&market=US&languages=en-us&MS-CV=DGU1mcuYo0WMMp+F.1`
    );
    const jsonData = await data.json();
    res.status(200).json(jsonData);
  } catch (err) {
    res.status(401).send(err);
  }
}
