using System;
using System.Collections.Generic;

namespace Glosys.Models;

public partial class ProjectPhoto
{
    public int PhotoId { get; set; }

    public string? ProjectPhotoName { get; set; }

    public int? PhotoProjectId { get; set; }

    public virtual Project? PhotoProject { get; set; }
}
