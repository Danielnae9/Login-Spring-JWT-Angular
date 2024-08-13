package com.example.User;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {

        User user = User.builder()
                .id(userRequest.id)
                .firstname(userRequest.getFirstname())
                .lastname(userRequest.lastname)
                .country(userRequest.getCountry())
                .role(Role.USER)
                .build();

        userRepository.updateUser(user.id, user.firstname, user.lastname, user.country);

        return new UserResponse("El usuario ha sido registrado");
    }

    public UserDTO getUser(Integer id) {
        User user= userRepository.findById(id).orElse(null);

        if (user!=null)
        {
            UserDTO userDTO = UserDTO.builder()
                    .id(user.id)
                    .username(user.username)
                    .firstname(user.firstname)
                    .lastname(user.lastname)
                    .country(user.country)
                    .build();
            return userDTO;
        }
        return null;
    }

    public Integer getUserIdByUsername(String username) {
        User user= userRepository.findByUsername(username).orElse(null);

        if (user!=null)
        {
            Integer id = user.id;
            return id;
        }
        return null;
    }
}