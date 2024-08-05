module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)\[(.*)\]: (.*)$/,
      headerCorrespondence: ["type", "scope", "subject"],
    },
  },
};
