"use strict";

GameDatabase.celestials.perkShop = (function() {
  function rebuyableCost(initialCost, increment, id) {
    return initialCost * Math.pow(increment, player.celestials.teresa.perkShop[id]);
  }
  function rebuyable(config) {
    return {
      id: config.id,
      cost: () => rebuyableCost(config.initialCost, config.increment, config.id),
      cap: () => config.cap(),
      description: config.description,
      effect: () => config.effect(player.celestials.teresa.perkShop[config.id]),
      formatEffect: config.formatEffect,
      formatCost: config.formatCost,
      rebuyable: true
    };
  }
  return {
    glyphLevel: rebuyable({
      id: 0,
      initialCost: 1,
      increment: 2,
      description: "Increase glyph levels by 5%",
      effect: bought => Math.pow(1.05, bought),
      formatEffect: value => formatX(value, 2, 2),
      formatCost: value => shorten(value, 2, 0),
      cap: () => Teresa.perkShopCap(PERK_SHOP.GLYPH_LEVEL.id)
    }),
    rmMult: rebuyable({
      id: 1,
      initialCost: 1,
      increment: 2,
      description: "Double RM gain",
      effect: bought => Math.pow(2, bought),
      formatEffect: value => formatX(value, 2, 0),
      formatCost: value => shorten(value, 2, 0),
      cap: () => Teresa.perkShopCap(PERK_SHOP.RM_MULT.id)
    }),
    bulkDilation: rebuyable({
      id: 2,
      initialCost: 100,
      increment: 2,
      description: "Buy twice as many dilation upgrades at once.",
      effect: bought => Math.pow(2, bought),
      formatEffect: value => formatX(value, 2, 0),
      formatCost: value => shorten(value, 2, 0),
      cap: () => Teresa.perkShopCap(PERK_SHOP.DILATION_BULK.id)
    }),
    musicGlyph: rebuyable({
      id: 3,
      initialCost: 1,
      increment: 1,
      description: "Receive a music glyph.",
      effect: bought => Decimal.pow(3, bought),
      formatEffect: () => "",
      formatCost: value => shorten(value, 2, 0),
      cap: () => Number.MAX_VALUE
    })
  };
}());
