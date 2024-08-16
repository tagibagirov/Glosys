using System;
using System.Collections.Generic;

namespace Glosys.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string? ProductName { get; set; }

    public string? ProductInfo { get; set; }

    public int? ProductCategoryId { get; set; }

    public virtual Category? ProductCategory { get; set; }

    public virtual ICollection<ProductPhoto> ProductPhotos { get; set; } = new List<ProductPhoto>();
}
