class ImageIndexResolver {
    static resolveImageIndex(percentage) {
        if (percentage <= 0) return 0;
        if (percentage <= 20) return 1;
        if (percentage <= 40) return 2;
        if (percentage <= 60) return 3;
        if (percentage <= 80) return 4;
        return 5;
    }
}