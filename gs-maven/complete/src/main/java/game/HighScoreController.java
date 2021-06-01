package game;

import java.util.*;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HighScoreController {

	private HighScoreRepository highScoreRepository;
	
	@GetMapping("/winners")
	public List<AIToken> getWinners() {
		return (List<AIToken>) highScoreRepository.findAll();
    }
	
	@PostMapping("/users")
    void addUser(@RequestBody AIToken winner) {
        highScoreRepository.save(winner);
    }
}
