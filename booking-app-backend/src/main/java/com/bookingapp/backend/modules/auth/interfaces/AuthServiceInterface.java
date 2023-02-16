package com.bookingapp.backend.modules.auth.interfaces;

import com.bookingapp.backend.modules.auth.dtos.DoLoginDTO;
import com.bookingapp.backend.modules.auth.dtos.LoginResponse;
import com.bookingapp.backend.modules.auth.dtos.RegisterDTO;
import com.bookingapp.backend.modules.user.dtos.UserDTO;

public interface AuthServiceInterface {
    UserDTO register(RegisterDTO data);
    LoginResponse doLogin(DoLoginDTO data);
}
