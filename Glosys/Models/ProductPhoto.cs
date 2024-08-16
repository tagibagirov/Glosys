using System;
using System.Collections.Generic;

namespace Glosys.Models;

public partial class ProductPhoto
{
    public int PhotoId { get; set; }

    public string? PhotoName { get; set; }

    public int? PhotoProductId { get; set; }

    public virtual Product? PhotoProduct { get; set; }
}
