import express from 'express';

const app = express();

app.set('PORT', process.env.PORT || 3333);

app.get('/', (req, res) => (res.json({ hello: 'world' })));

app.listen(app.get('PORT'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on *:${app.get('PORT')}`);
});
