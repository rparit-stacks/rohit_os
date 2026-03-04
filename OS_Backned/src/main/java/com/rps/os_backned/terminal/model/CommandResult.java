package com.rps.os_backned.terminal.model;

public class CommandResult {

    private final String output;
    private final int exitCode;
    private final String action; // e.g. CLEAR, SET_THEME, OPEN_APP

    public CommandResult(String output, int exitCode) {
        this(output, exitCode, null);
    }

    public CommandResult(String output, int exitCode, String action) {
        this.output = output;
        this.exitCode = exitCode;
        this.action = action;
    }

    public String getOutput() {
        return output;
    }

    public int getExitCode() {
        return exitCode;
    }

    public String getAction() {
        return action;
    }
}

