package game;

import javax.persistence.*;

/**
 * Entity implementation class for Entity: AIToken
 *
 */
@Entity
public class AIToken {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String player;
	private int count;

	private static final long serialVersionUID = 1L;

	public AIToken() { }

	public AIToken(String player, int count) {
		this.player = player;
		this.count = count;
	}

	public String getPlayer() {
		return player;
	}

	public void setPlayer(String player) {
		this.player = player;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
	
}
