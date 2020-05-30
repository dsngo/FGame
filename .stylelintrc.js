const stylelintCfg = {
  extends: "stylelint-prettier/recommended",
  plugins: ["stylelint-order"],
  rules: {
    "rule-empty-line-before": "always",
    "order/order": ["custom-properties", "declarations"],
    "order/properties-order": [
      [
        "height",
        "width",
        "position",
        "top",
        "bottom",
        "left",
        "right",
        "display",
      ],
      { unspecified: "bottomAlphabetical" },
    ],
    // "order/properties-alphabetical-order": true,
  },
};

module.exports = stylelintCfg;
