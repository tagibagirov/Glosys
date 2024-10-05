using System;
using System.Collections.Generic;

namespace Glosys.Models;

public partial class Project
{
    public int ProjectId { get; set; }

    public string? ProjectName { get; set; }

    public string? ProjectInfo { get; set; }

    public virtual ICollection<ProjectPhoto> ProjectPhotos { get; set; } = new List<ProjectPhoto>();
}
