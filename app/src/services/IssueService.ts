import { IssueRepository } from '@/repositories/IssueRepository';
import { IssueValidator } from '@/validators/IssueValidator';
import { Issue } from '@/models/Issue';
import { NotFoundError } from '@/utils/AppError';

export class IssueService {
  private repository: IssueRepository;
  private validator: IssueValidator;

  constructor() {
    this.repository = new IssueRepository();
    this.validator = new IssueValidator();
  }

  async createIssue(userId: string, data: any): Promise<Issue> {
    const validated = this.validator.validateCreate(data);
    return this.repository.create({ ...validated, user_id: userId } as any);
  }

  async getIssues(userId: string, filterType?: string, searchQuery?: string): Promise<Issue[]> {
    return this.repository.findAll(userId, filterType, searchQuery);
  }

  async getIssueById(id: string, userId: string): Promise<Issue> {
    const issue = await this.repository.findById(id);
    if (!issue || issue.user_id !== userId) {
      throw new NotFoundError('Issue not found');
    }
    return issue;
  }

  async updateIssue(id: string, userId: string, data: any): Promise<Issue> {
    const validated = this.validator.validateUpdate(data);
    const updatedIssue = await this.repository.update(id, userId, validated);
    if (!updatedIssue) {
      throw new NotFoundError('Issue not found or unauthorized');
    }
    return updatedIssue;
  }

  async deleteIssue(id: string, userId: string): Promise<void> {
    const success = await this.repository.delete(id, userId);
    if (!success) {
      throw new NotFoundError('Issue not found or unauthorized');
    }
  }
}
