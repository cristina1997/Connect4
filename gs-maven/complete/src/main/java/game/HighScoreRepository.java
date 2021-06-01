package game;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface HighScoreRepository extends CrudRepository <AIToken, Long> { }
