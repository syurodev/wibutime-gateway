import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UtilsBaseExceptionLangValidator } from 'src/utils.common/utils.exception.lang.common/utils.base.exception.lang.validator';
export class UserCreateDTO {
  @ApiProperty({
    required: true,
    example: '',
    description: UtilsBaseExceptionLangValidator.exceptionUsername(),
  })
  @IsNotEmpty()
  @Length(1, 255)
  readonly username: string;

  @ApiProperty({
    required: true,
    example: '',
  })
  @IsNotEmpty()
  @Length(1, 255)
  readonly name: string;

  @ApiProperty({
    required: false,
    example: 1111111111,
    description: UtilsBaseExceptionLangValidator.exceptionPhoneNumber(),
  })
  readonly phone_number: string;

  @ApiProperty({
    required: false,
    example: 1111111111,
    description: UtilsBaseExceptionLangValidator.exceptionEmail(),
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    required: false,
    example: '',
    description: UtilsBaseExceptionLangValidator.exceptionPassword(),
  })
  @IsNotEmpty()
  readonly password: string;
}
