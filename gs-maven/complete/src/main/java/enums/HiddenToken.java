package enums;

public enum HiddenToken {
	TRUE("true"), FALSE("false");

	public final String hiddenToken;

	private HiddenToken(String hiddenToken) {
	      this.hiddenToken = hiddenToken;
	  }
}
