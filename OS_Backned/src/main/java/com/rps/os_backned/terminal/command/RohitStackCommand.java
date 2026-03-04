package com.rps.os_backned.terminal.command;

import com.rps.os_backned.terminal.model.CommandResult;
import com.rps.os_backned.terminal.model.SessionContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RohitStackCommand implements RohitCommand {

  @Override
  public String getName() {
    return "stack";
  }

  @Override
  public String getDescription() {
    return "Show primary tech stack summary";
  }

  @Override
  public String getUsage() {
    return "rohit stack";
  }

  @Override
  public CommandResult execute(List<String> args, SessionContext ctx) {
    StringBuilder sb = new StringBuilder();
    sb.append("Primary stack:\n");
    sb.append("  Backend : Java, Spring Boot, Spring Security, Spring Data JPA, REST APIs\n");
    sb.append("  DB      : MySQL, PostgreSQL, MongoDB, Redis\n");
    sb.append("  Frontend: React, TypeScript, Tailwind CSS\n");
    sb.append("  DevOps  : Docker, AWS, CI/CD, GitHub Actions, Linux\n");
    return new CommandResult(sb.toString(), 0);
  }
}

