import React from 'react';

const Tile = ({
  name, date, amount
}) => (
    <section>
      { name }
      { date }
      { amount }
    </section>
);

export default Tile;
