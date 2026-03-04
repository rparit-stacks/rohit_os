package com.rps.os_backned.terminal.command;

import com.rps.os_backned.skill.model.SkillCategoryDocument;
import com.rps.os_backned.skill.service.SkillService;
import com.rps.os_backned.terminal.model.CommandResult;
import com.rps.os_backned.terminal.model.SessionContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RohitSkillsCommand implements RohitCommand {

  private final SkillService skillService;

  public RohitSkillsCommand(SkillService skillService) {
    this.skillService = skillService;
  }

  @Override
  public String getName() {
    return "skills";
  }

  @Override
  public String getDescription() {
    return "List grouped skills from the portfolio";
  }

  @Override
  public String getUsage() {
    return "rohit skills";
  }

  @Override
  public CommandResult execute(List<String> args, SessionContext ctx) {
    List<SkillCategoryDocument> cats = skillService.getAllCategories();
    if (cats.isEmpty()) {
      return new CommandResult("No skills found in database. Seed the 'skill_categories' collection first.", 1);
    }
    StringBuilder sb = new StringBuilder();
    sb.append("Loaded skills from portfolio backend:\n\n");
    for (SkillCategoryDocument c : cats) {
      sb.append("[").append(c.getName()).append("]").append("\n");
      if (c.getItems() != null) {
        for (String item : c.getItems()) {
          sb.append("  • ").append(item).append("\n");
        }
      }
      sb.append("\n");
    }
    return new CommandResult(sb.toString(), 0);
  }
}

