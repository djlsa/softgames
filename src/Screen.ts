export class Screen {
    private static WIDTH = screen.width;
    private static SCALE_W = 1.0;
    private static HEIGHT = screen.height;
    private static SCALE_H = 1.0;

    public static getWidth(): number {
        return Screen.WIDTH;
    }

    public static getHeight(): number {
        return Screen.HEIGHT;
    }

    public static getScale(): number {
        Screen.SCALE_W = window.innerWidth / Screen.WIDTH;
        Screen.SCALE_H = window.innerHeight / Screen.HEIGHT;
        return Math.min(Screen.SCALE_W, Screen.SCALE_H);
    }
}