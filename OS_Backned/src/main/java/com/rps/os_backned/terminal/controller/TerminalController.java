package com.rps.os_backned.terminal.controller;

import com.rps.os_backned.terminal.model.CommandResult;
import com.rps.os_backned.terminal.model.TerminalRequest;
import com.rps.os_backned.terminal.model.TerminalResponse;
import com.rps.os_backned.terminal.service.CommandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/terminal")
@CrossOrigin(origins = "*")
public class TerminalController {

    private final CommandService commandService;

    public TerminalController(CommandService commandService) {
        this.commandService = commandService;
    }

    @PostMapping("/execute")
    public ResponseEntity<TerminalResponse> execute(@RequestBody TerminalRequest request) {
        if (request.getCommand() == null || request.getCommand().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        String sessionId = request.getSessionId();
        CommandResult result = commandService.execute(sessionId, request.getCommand());
        TerminalResponse resp = new TerminalResponse();
        resp.setSessionId(sessionId);
        resp.setOutput(result.getOutput());
        resp.setExitCode(result.getExitCode());
        resp.setAction(result.getAction());
        resp.setPrompt("rohit> ");
        return ResponseEntity.ok(resp);
    }
}

