const stylelintCfg = {
  extends: "stylelint-prettier/recommended",
  plugins: ["stylelint-order"],
  rules: {
    "rule-empty-line-before": "always",
    "order/order": ["custom-properties", "declarations"],
    "order/properties-order": [
      ["height", "width", "position", "top", "left", "right", "bottom", "display"],
      { unspecified: "bottomAlphabetical" },
    ],
    // "order/properties-alphabetical-order": true,
  },
};

module.exports = stylelintCfg;
