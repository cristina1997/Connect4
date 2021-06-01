package enums;

public enum GameState {
	START("start"), END("end");

	public final String gameState;

	private GameState(String gameState) {
      this.gameState = gameState;
  }
}
