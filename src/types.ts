export interface Config {
    options: {
        T?: string;
        O?: string;
        F?: boolean;
    };
    args: string[];
}

export interface NormalizedConfig {
    inputFile: string;
    tab?: number | string;
    output?: string;
    format: { [key: string]: string };
}
