using System;
using System.Collections.Generic;

namespace Glosys.Models;

public partial class Galery
{
    public int GaleryPhotoId { get; set; }

    public string? GaleryPhotoName { get; set; }

    public int? GaleryPhotoCategoryId { get; set; }

    public virtual GaleryCategory? GaleryPhotoCategory { get; set; }
}
