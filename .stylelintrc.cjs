module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended",
    "stylelint-config-rational-order",
  ],
  overrides: [
    {
      files: ["**/*.html", "**/*.svelte"],
      customSyntax: "postcss-html",
    },
  ],
  rules: {
    "media-feature-range-notation": "prefix",
    "color-hex-alpha": "never",
    "declaration-no-important": true,
    "alpha-value-notation": "number",
    "color-hex-length": "long",
    "font-weight-notation": "numeric",
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] },
    ],
  },
};
