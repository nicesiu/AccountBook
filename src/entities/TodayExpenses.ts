import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateIf } from 'class-validator';
import dayjs from 'dayjs';
import { from } from 'rxjs';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountBook } from './AccountBook';

@Entity()
export class TodayExpenses {
  @ApiProperty({
    example: 1,
    description: 'TodayExpenses 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((object, value) => value !== null)
  @IsNumber()
  @ApiProperty({
    example: 20000,
    description: '지출 금액',
  })
  @Column({ type: 'int', name: 'expenses', nullable: true })
  expenses: number | null;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  @ApiProperty({
    example: '스타벅스 아메리카노',
    description: '지출한 내역 메모',
  })
  @Column({ type: 'varchar', name: 'memo', nullable: true })
  memo: string | null;

  @ValidateIf((object, value) => value !== null)
  @IsNumber()
  @Column({
    type: 'int',
    name: 'account_book_id',
    nullable: true,
  })
  account_book_id: number | null;

  // @Column({ type: 'varchar', name: 'created_at', nullable: true })
  // createdAt: string | null;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  @CreateDateColumn({
    name: 'created_at',
    nullable: true,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return value;
      },
    },
  })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => AccountBook, (accountBook) => accountBook.TodayExpenses, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'account_book_id', referencedColumnName: 'id' }])
  accountBookId: AccountBook;
}
