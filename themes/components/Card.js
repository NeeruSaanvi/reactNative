import variable from "./../variables/platform";

export default (variables = variable) => {
  const cardTheme = {
    ".transparent": {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null,
      elevation: null
    },
    ".noShadow": {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      elevation: null
    },
    marginVertical: 4,
    marginHorizontal: 2,
    flex: 1,
    borderWidth: variables.borderWidth,
    borderRadius: 4,
    borderColor: variables.cardBorderColor,
    flexWrap: "nowrap",
    backgroundColor: variables.cardDefaultBg,
    shadowColor: "rgba(0,0,0,0.08)",
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3
  };

  return cardTheme;
};
