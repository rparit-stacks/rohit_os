package com.rps.os_backned.terminal.service;

import com.rps.os_backned.terminal.command.CommandRegistryAware;
import com.rps.os_backned.terminal.command.RohitCommand;
import com.rps.os_backned.terminal.model.CommandResult;
import com.rps.os_backned.terminal.model.SessionContext;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class CommandService {

    private final Map<String, RohitCommand> commandsByName = new HashMap<>();
    private final SessionService sessionService;
    private final List<RohitCommand> commands;

    public CommandService(List<RohitCommand> commands, SessionService sessionService) {
        this.commands = commands;
        this.sessionService = sessionService;
        for (RohitCommand cmd : commands) {
            commandsByName.put(cmd.getName().toLowerCase(Locale.ROOT), cmd);
            if (cmd instanceof CommandRegistryAware) {
                ((CommandRegistryAware) cmd).setCommands(commands);
            }
        }
    }

    public List<RohitCommand> getAllCommands() {
        return commands;
    }

    public CommandResult execute(String sessionId, String rawLine) {
        if (rawLine == null) {
            rawLine = "";
        }
        String trimmed = rawLine.trim();
        if (trimmed.isEmpty()) {
            return new CommandResult("", 0);
        }

        String[] tokens = trimmed.split("\\s+");
        if (!tokens[0].equalsIgnoreCase("rohit")) {
            return new CommandResult("Commands must start with 'rohit'. Try: rohit help", 1);
        }
        if (tokens.length == 1) {
            return new CommandResult("Usage: rohit <command> [args]. Try: rohit help", 1);
        }

        String sub = tokens[1].toLowerCase(Locale.ROOT);
        RohitCommand cmd = commandsByName.get(sub);
        if (cmd == null) {
            return new CommandResult("Unknown command: " + sub + "\nType 'rohit help' to see available commands.", 1);
        }

        SessionContext ctx = sessionService.getOrCreate(sessionId);
        int argsCount = tokens.length - 2;
        List<String> args;
        if (argsCount <= 0) {
            args = List.of();
        } else {
            String[] arr = new String[argsCount];
            for (int i = 0; i < argsCount; i++) {
                arr[i] = tokens[i + 2];
            }
            args = List.of(arr);
        }

        try {
            return cmd.execute(args, ctx);
        } catch (Exception ex) {
            return new CommandResult("Error while executing command: " + ex.getMessage(), 1);
        }
    }
}

