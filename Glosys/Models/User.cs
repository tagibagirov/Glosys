using System;
using System.Collections.Generic;

namespace Glosys.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? UserFirsName { get; set; }

    public string? UserLastName { get; set; }

    public string? UserNickName { get; set; }

    public string? UserPassword { get; set; }

    public string? UserRole { get; set; }
}
