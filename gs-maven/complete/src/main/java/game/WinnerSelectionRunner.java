package game;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;

@SpringBootApplication
public class WinnerSelectionRunner {
	
	private final HighScoreRepository repository;
	private int count = 0;

	public WinnerSelectionRunner(@Lazy HighScoreRepository repository) {
		this.repository = repository;
	}	
	
	public static void main(String[] args) {
		SpringApplication.run(WinnerSelectionRunner.class, args);
	}
	    
    @Bean
    CommandLineRunner entityManagerFactory() {
        return args -> {
    		Stream.of("red", "yellow").forEach(player -> { 
            	AIToken winner = new AIToken(player, count++);
            	repository.save(winner);
        	});
    		repository.findAll().forEach(System.out::println);	
        };
    }
   
}
