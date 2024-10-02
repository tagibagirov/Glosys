using System;
using System.Collections.Generic;

namespace Glosys.Models;

public partial class GaleryCategory
{
    public int CategoryId { get; set; }

    public string? CategoryName { get; set; }

    public virtual ICollection<Galery> Galeries { get; set; } = new List<Galery>();
}
